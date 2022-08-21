module.exports = {
  presets: [
    "@babel/preset-react"
  ],
  plugins: [
    [
      require("./src"),
      {
        import: "log-sdk",
        named: "log",
        nameHint: "_hubbleLog",
      }
    ]
  ]
}
