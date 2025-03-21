// vite.config.ts
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import react from "file:///app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";

// plugins/search-map/search-map-transformer.ts
import { types } from "file:///app/node_modules/@babel/core/lib/index.js";
function searchMapTransformer() {
  return {
    name: "search-map-transformer",
    visitor: {
      JSXOpeningElement(path2) {
        const attributes = path2.node.attributes;
        const searchKeyAttribute = attributes.find(
          (attr) => types.isJSXAttribute(attr) && types.isJSXIdentifier(attr.name, { name: "searchKey" })
        );
        if (!searchKeyAttribute || !types.isJSXAttribute(searchKeyAttribute))
          return;
        if (!types.isJSXExpressionContainer(searchKeyAttribute.value) || !types.isObjectExpression(searchKeyAttribute.value.expression))
          throw new Error("searchKey must be an object");
        const props = searchKeyAttribute.value.expression.properties;
        const idProp = props.find(
          (x) => types.isObjectProperty(x) && types.isIdentifier(x.key) && x.key.name === "id"
        );
        if (!idProp) throw new Error("searchKey must have an id");
        if (!types.isStringLiteral(idProp.value))
          throw new Error("id must be a string");
        if (types.isJSXIdentifier(path2.node.name) && path2.node.name.name.startsWith(path2.node.name.name[0].toUpperCase())) {
          const parentPath = path2.parentPath;
          if (types.isJSXElement(parentPath.node)) {
            const jsxElement = parentPath.node;
            const divElement = types.jsxElement(
              types.jsxOpeningElement(types.jsxIdentifier("div"), [
                types.jsxAttribute(
                  types.jsxIdentifier("data-search-key"),
                  idProp.value
                ),
                types.jsxAttribute(
                  types.jsxIdentifier("className"),
                  types.stringLiteral("search-target-container")
                )
              ]),
              types.jsxClosingElement(types.jsxIdentifier("div")),
              [jsxElement]
            );
            path2.node.attributes = attributes.filter(
              (attr) => attr !== searchKeyAttribute
            );
            parentPath.replaceWith(divElement);
            parentPath.skip();
          }
        } else {
          searchKeyAttribute.name = types.jsxIdentifier("data-search-key");
          searchKeyAttribute.value = types.jsxExpressionContainer(idProp.value);
        }
      }
    }
  };
}

// vite.config.ts
import tsconfigPaths from "file:///app/node_modules/vite-tsconfig-paths/dist/index.js";
import netlifyPlugin from "file:///app/node_modules/@netlify/vite-plugin-react-router/dist/index.mjs";
var __vite_injected_original_dirname = "/app";
var vite_config_default = defineConfig({
  base: "/",
  preview: {
    port: 5173,
    strictPort: true
  },
  server: {
    host: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [searchMapTransformer()]
      }
    }),
    tsconfigPaths(),
    netlifyPlugin()
  ],
  resolve: {
    alias: {
      "@shared": path.resolve(__vite_injected_original_dirname, "../shared-frontend"),
      "@styles": path.resolve(__vite_injected_original_dirname, "../shared-frontend/sass"),
      "@api": path.resolve(__vite_injected_original_dirname, "../shared-frontend/api-dsl"),
      "@assets": path.resolve(__vite_injected_original_dirname, "src/assets"),
      "@data": path.resolve(__vite_injected_original_dirname, "src/assets/json-data/data"),
      "@contexts": path.resolve(__vite_injected_original_dirname, "src/contexts"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "src/hooks"),
      "@components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@utility": path.resolve(__vite_injected_original_dirname, "src/utility"),
      "@better-router": path.resolve(__vite_injected_original_dirname, "src/better-router"),
      "@i18n": path.resolve(__vite_injected_original_dirname, "src/i18n.ts")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `
          @use "@styles/_palette.scss" as *;

          @use "@styles/_mixins.scss" as *;

        `
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          const match = /node_modules\/((?:@[^/]+\/)?[^/]+)/.exec(id);
          const packageName = match?.[1];
          if (!packageName) return;
          if (packageName.includes("motion")) return "vendor-motion";
          return "vendor";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2lucy9zZWFyY2gtbWFwL3NlYXJjaC1tYXAtdHJhbnNmb3JtZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBzZWFyY2hNYXBUcmFuc2Zvcm1lciBmcm9tIFwiLi9wbHVnaW5zL3NlYXJjaC1tYXAvc2VhcmNoLW1hcC10cmFuc2Zvcm1lclwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCBuZXRsaWZ5UGx1Z2luIGZyb20gXCJAbmV0bGlmeS92aXRlLXBsdWdpbi1yZWFjdC1yb3V0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIvXCIsXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIGJhYmVsOiB7XG4gICAgICAgIHBsdWdpbnM6IFtzZWFyY2hNYXBUcmFuc2Zvcm1lcigpXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIG5ldGxpZnlQbHVnaW4oKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBzaGFyZWRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zaGFyZWQtZnJvbnRlbmRcIiksXG4gICAgICBcIkBzdHlsZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zaGFyZWQtZnJvbnRlbmQvc2Fzc1wiKSxcbiAgICAgIFwiQGFwaVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL3NoYXJlZC1mcm9udGVuZC9hcGktZHNsXCIpLFxuICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2Fzc2V0c1wiKSxcbiAgICAgIFwiQGRhdGFcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYXNzZXRzL2pzb24tZGF0YS9kYXRhXCIpLFxuICAgICAgXCJAY29udGV4dHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29udGV4dHNcIiksXG4gICAgICBcIkBob29rc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9ob29rc1wiKSxcbiAgICAgIFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29tcG9uZW50c1wiKSxcbiAgICAgIFwiQHV0aWxpdHlcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvdXRpbGl0eVwiKSxcbiAgICAgIFwiQGJldHRlci1yb3V0ZXJcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYmV0dGVyLXJvdXRlclwiKSxcbiAgICAgIFwiQGkxOG5cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaTE4bi50c1wiKSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFwaTogXCJtb2Rlcm4tY29tcGlsZXJcIixcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICBAdXNlIFwiQHN0eWxlcy9fcGFsZXR0ZS5zY3NzXCIgYXMgKjtcXG5cbiAgICAgICAgICBAdXNlIFwiQHN0eWxlcy9fbWl4aW5zLnNjc3NcIiBhcyAqO1xcblxuICAgICAgICBgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoIWlkLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBtYXRjaCA9IC9ub2RlX21vZHVsZXNcXC8oKD86QFteL10rXFwvKT9bXi9dKykvLmV4ZWMoaWQpO1xuICAgICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gbWF0Y2g/LlsxXTtcbiAgICAgICAgICBpZiAoIXBhY2thZ2VOYW1lKSByZXR1cm47XG5cbiAgICAgICAgICBpZiAocGFja2FnZU5hbWUuaW5jbHVkZXMoXCJtb3Rpb25cIikpIHJldHVybiBcInZlbmRvci1tb3Rpb25cIjtcblxuICAgICAgICAgIHJldHVybiBcInZlbmRvclwiO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG5cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2FwcC9wbHVnaW5zL3NlYXJjaC1tYXBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvcGx1Z2lucy9zZWFyY2gtbWFwL3NlYXJjaC1tYXAtdHJhbnNmb3JtZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2FwcC9wbHVnaW5zL3NlYXJjaC1tYXAvc2VhcmNoLW1hcC10cmFuc2Zvcm1lci50c1wiO2ltcG9ydCB7IE5vZGVQYXRoLCBQbHVnaW5PYmosIHR5cGVzIH0gZnJvbSBcIkBiYWJlbC9jb3JlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlYXJjaE1hcFRyYW5zZm9ybWVyKCk6IFBsdWdpbk9iaiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJzZWFyY2gtbWFwLXRyYW5zZm9ybWVyXCIsXG4gICAgdmlzaXRvcjoge1xuICAgICAgSlNYT3BlbmluZ0VsZW1lbnQocGF0aDogTm9kZVBhdGg8dHlwZXMuSlNYT3BlbmluZ0VsZW1lbnQ+KSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBwYXRoLm5vZGUuYXR0cmlidXRlcztcbiAgICAgICAgY29uc3Qgc2VhcmNoS2V5QXR0cmlidXRlID0gYXR0cmlidXRlcy5maW5kKFxuICAgICAgICAgIChhdHRyKSA9PlxuICAgICAgICAgICAgdHlwZXMuaXNKU1hBdHRyaWJ1dGUoYXR0cikgJiZcbiAgICAgICAgICAgIHR5cGVzLmlzSlNYSWRlbnRpZmllcihhdHRyLm5hbWUsIHsgbmFtZTogXCJzZWFyY2hLZXlcIiB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghc2VhcmNoS2V5QXR0cmlidXRlIHx8ICF0eXBlcy5pc0pTWEF0dHJpYnV0ZShzZWFyY2hLZXlBdHRyaWJ1dGUpKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgIXR5cGVzLmlzSlNYRXhwcmVzc2lvbkNvbnRhaW5lcihzZWFyY2hLZXlBdHRyaWJ1dGUudmFsdWUpIHx8XG4gICAgICAgICAgIXR5cGVzLmlzT2JqZWN0RXhwcmVzc2lvbihzZWFyY2hLZXlBdHRyaWJ1dGUudmFsdWUuZXhwcmVzc2lvbilcbiAgICAgICAgKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNlYXJjaEtleSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgICAgICBjb25zdCBwcm9wcyA9IHNlYXJjaEtleUF0dHJpYnV0ZS52YWx1ZS5leHByZXNzaW9uLnByb3BlcnRpZXM7XG4gICAgICAgIGNvbnN0IGlkUHJvcCA9IHByb3BzLmZpbmQoXG4gICAgICAgICAgKHgpID0+XG4gICAgICAgICAgICB0eXBlcy5pc09iamVjdFByb3BlcnR5KHgpICYmXG4gICAgICAgICAgICB0eXBlcy5pc0lkZW50aWZpZXIoeC5rZXkpICYmXG4gICAgICAgICAgICB4LmtleS5uYW1lID09PSBcImlkXCJcbiAgICAgICAgKSBhcyB0eXBlcy5PYmplY3RQcm9wZXJ0eTtcblxuICAgICAgICBpZiAoIWlkUHJvcCkgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoS2V5IG11c3QgaGF2ZSBhbiBpZFwiKTtcblxuICAgICAgICBpZiAoIXR5cGVzLmlzU3RyaW5nTGl0ZXJhbChpZFByb3AudmFsdWUpKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImlkIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVzLmlzSlNYSWRlbnRpZmllcihwYXRoLm5vZGUubmFtZSkgJiZcbiAgICAgICAgICBwYXRoLm5vZGUubmFtZS5uYW1lLnN0YXJ0c1dpdGgocGF0aC5ub2RlLm5hbWUubmFtZVswXS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLz8gQ3VzdG9tIFJlYWN0IGNvbXBvbmVudFxuICAgICAgICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRoLnBhcmVudFBhdGg7XG4gICAgICAgICAgaWYgKHR5cGVzLmlzSlNYRWxlbWVudChwYXJlbnRQYXRoLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBqc3hFbGVtZW50ID0gcGFyZW50UGF0aC5ub2RlO1xuICAgICAgICAgICAgY29uc3QgZGl2RWxlbWVudCA9IHR5cGVzLmpzeEVsZW1lbnQoXG4gICAgICAgICAgICAgIHR5cGVzLmpzeE9wZW5pbmdFbGVtZW50KHR5cGVzLmpzeElkZW50aWZpZXIoXCJkaXZcIiksIFtcbiAgICAgICAgICAgICAgICB0eXBlcy5qc3hBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICB0eXBlcy5qc3hJZGVudGlmaWVyKFwiZGF0YS1zZWFyY2gta2V5XCIpLFxuICAgICAgICAgICAgICAgICAgaWRQcm9wLnZhbHVlXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0eXBlcy5qc3hBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICB0eXBlcy5qc3hJZGVudGlmaWVyKFwiY2xhc3NOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgdHlwZXMuc3RyaW5nTGl0ZXJhbChcInNlYXJjaC10YXJnZXQtY29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIHR5cGVzLmpzeENsb3NpbmdFbGVtZW50KHR5cGVzLmpzeElkZW50aWZpZXIoXCJkaXZcIikpLFxuICAgICAgICAgICAgICBbanN4RWxlbWVudF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoLm5vZGUuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAoYXR0cikgPT4gYXR0ciAhPT0gc2VhcmNoS2V5QXR0cmlidXRlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGFyZW50UGF0aC5yZXBsYWNlV2l0aChkaXZFbGVtZW50KTtcbiAgICAgICAgICAgIHBhcmVudFBhdGguc2tpcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLz8gSFRNTCBSZWFjdCBjb21wb25lbnRcbiAgICAgICAgICBzZWFyY2hLZXlBdHRyaWJ1dGUubmFtZSA9IHR5cGVzLmpzeElkZW50aWZpZXIoXCJkYXRhLXNlYXJjaC1rZXlcIik7XG4gICAgICAgICAgc2VhcmNoS2V5QXR0cmlidXRlLnZhbHVlID0gdHlwZXMuanN4RXhwcmVzc2lvbkNvbnRhaW5lcihpZFByb3AudmFs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
