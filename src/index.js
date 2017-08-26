
class WebpackChunkSizePlugin {
    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        compiler.plugin("done", (stats) => {
            if (this.options.filename) {
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
                    if (asset.emitted) {
                        return {
                            file: stripHash(asset.name),
                            size: asset.size,
                        };
                    }
                }).sort((a, b) => {
                    return a.file.toLowerCase().localeCompare(b.file.toLowerCase());
                });
                require("fs").writeFileSync(
                    this.options.filename,
                    JSON.stringify(stats2),
                );
            }
        });
    }
}

function stripHash(filename) {
    var idx = filename.indexOf('?');
    return (idx === -1) ? filename : filename.substring(0, idx);
}

module.exports = WebpackChunkSizePlugin;
