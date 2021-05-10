/* doiuse не корректно работает */

module.exports = {
  plugins: {
    doiuse: {
      browsers: "defaults",
      ignore: ["text-size-adjust", "outline", "undefined"],
      onFeatureUsage: function (info) {
        const selector = info.usage.parent.selector;
        const property = `${info.usage.prop}: ${info.usage.value}`;
        const browser = info.featureData.missing || info.featureData.partial;

        let status = info.featureData.caniuseData.status.toUpperCase();

        if (info.featureData.missing) {
          status = "NOT SUPPORTED".brightRed;
        } else if (info.featureData.partial) {
          status = "PARTICAL SUPPORTED".brightYellow;
        }

        if (browser.includes("Safari") || browser.includes("iOS") || browser.includes("Firefox")) {
          console.log(`\n${status} in ${browser.green}  :\n\n    ${selector} {\n        ${property};\n    }\n`);
        }
      },
    },

    "postcss-preset-env": {
      browsers: "last 2 versions",
    },
  },
};
