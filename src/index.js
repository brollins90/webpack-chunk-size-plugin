class WebpackChunkSizePlugin {

	constructor(context, request) {
		if(!request) {
			this.request = context;
		} else {
			this.context = context;
			this.request = request;
		}
	}

	apply(compiler) {
		compiler.plugin("done", (stats) => {
            const stats2 = stats.toJson({
                performance: false,
                hash: false,
                version: false,
                timings: false,
                assets: true,
                entrypoints: false,
                chunks: false,
                chunkModules: false,
                chunkOrigins: false,
                modules: false,
                depth: false,
                cached: false,
                cachedAssets: false,
                reasons: false,
                usedExports: false,
                providedExports: false,
                optimizationBailout: false,
                children: false,
                source: false,
            }).assets.map((asset) => {
                return {
                    cleanName: stripHash(asset.name),
                    ...asset,
                };
            });
            require("fs").writeFileSync(
                path.join(__dirname, "..", "stats.json"),
                JSON.stringify(stats2));
		});
	}
}

function stripHash(filename) {
    var idx = filename.indexOf('?');
    return filename.substring(0, idx);
}

module.exports = WebpackChunkSizePlugin;
