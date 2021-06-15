const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const colors = require("colors");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CssUrlRelativePlugin = require("css-url-relative-plugin");

/* images start */
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminSvgo = require("imagemin-svgo");
const { extendDefaultPlugins } = require("svgo");
// const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

/* images finish */

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
isDev ? console.log("DEVELOPMENT is going....".magenta) : console.log("PRODUCTION is going....".magenta);

const create_page = process.env.NEW_PAGE === "create";

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
    "postcss-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: "./templates/index/#index_ur.pug",
      filename: "index_ur.html",
      chunks: ["_global", "index_fiz"],
    }),

    new HTMLWebpackPlugin({
      template: "./templates/index/#index_fiz.pug",
      filename: "index_fiz.html",
      chunks: ["_global", "index_fiz"],
    }),

    new HTMLWebpackPlugin({
      template: "./templates/preloader/#preloader.pug",
      filename: "preloader.html",
      chunks: ["_global", "preloader"],
    }),

    new CleanWebpackPlugin(),
    /* копировать файлы без обработки */
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src/assets/videos"),
    //       to: path.resolve(__dirname, "dist/assets/videos"),
    //     },
    //   ],
    // }),

    new MiniCssExtractPlugin({
      filename: "./styles/[name].[contenthash].css",
    }),
    new CssUrlRelativePlugin(/* options */),
  ];

  if (isProd) {
    /* оптимизация картинок */
    base.push(
      new ImageminPlugin({
        pngquant: {
          quality: "75",
          optimizationLevel: 6,
        },

        plugins: [
          imageminMozjpeg({ quality: 75, progressive: true }),
          imageminSvgo({
            plugins: extendDefaultPlugins([{ name: "removeViewBox", active: false }]),
          }),
        ],
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, "./src/assets/favicon.png"),
        outputPath: path.resolve(__dirname, "./dist/assets/favicons/"),
        prefix: "./assets/favicons/",
      })

      // new ImageminWebpWebpackPlugin()
    );

    /* аналайзер */
    base.push(new BundleAnalyzerPlugin({ logLevel: "silent" }));
  }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, "src"),

  mode: "development",
  entry: {
    _global: ["./js/_global/_global.js"],
    index_fiz: ["./js/index/#index_fiz.js"],
    index_ur: ["./js/index/#index_ur.js"],
    preloader: ["./js/preloader/#preloader.js"],
    // about: ["./js/about/#about.js"],
  },
  output: {
    filename: "./js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    /* список расширений при импорте */
    // extensions: [""],
    /* упрощение вложенности. В import ./ меняется на @ */
    alias: {
      "@js": path.resolve(__dirname, "src/js"),
      "@scss": path.resolve(__dirname, "src/scss"),
      "@": path.resolve(__dirname, "src/"),
    },
  },
  optimization: optimization(),

  target: "web",
  devServer: {
    port: 3000,
    open: true,
    liveReload: true,
    // hot: isDev,
  },

  devtool: isDev ? "source-map" : false,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },

      {
        test: /\.scss$/,
        use: cssLoaders("sass-loader"),
      },

      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name]-[contenthash].[ext]",
              outputPath: "./assets/videos/",
            },
          },
        ],
      },

      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name]-[contenthash].[ext]",
              outputPath: "./assets/audios/",
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name]-[contenthash].[ext]",
              outputPath: "./assets/images/",
            },
          },
        ],
      },

      {
        test: /\.pug$/,
        loader: "pug-loader",
      },

      /* work only with 0.5 html loader */
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          attrs: ["img:src", "source:srcset"],
        },
      },

      {
        test: /\.(ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./assets/fonts/",
              name: "[name].[ext]",
            },
          },
        ],
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: plugins(),
};

// if (create_page) {
//   const Page = require("./pages.js");

//   const testPage = new Page({
//     name: "dummy",
//     ext: ["js"],
//   });
// }
