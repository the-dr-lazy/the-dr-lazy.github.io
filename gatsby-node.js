/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const globby = require('globby')
const {
  createPath,
  validatePath,
  ignorePath,
  watchDirectory,
} = require('gatsby-page-utils')

function root(...args) {
  return path.resolve(__dirname, ...args)
}

const paths = {
  pageDir: root('src/Page'),
}

async function createPages({ store, actions }) {
  const { createPage, deletePage } = actions
  const program = store.getState().program
  const exts = program.extensions.map(e => `${e.slice(1)}`).join(`,`)

  const glob = `**/*.{${exts}}`

  // Get initial list of files.
  let filePaths = await globby(glob, { cwd: paths.pageDir })

  console.log(filePaths)

  function createPagesFromFilePaths(ps) {
    ps.filter(filePath => validatePath(filePath))
      .map(filePath => ({
        path: createPath(filePath.toLowerCase()),
        component: path.join(paths.pageDir, filePath),
      }))
      .forEach(page => {
        console.log(page)
        createPage(page)
      })
  }

  createPagesFromFilePaths(filePaths)

  function handleAddedPath(filePath) {
    if (filePaths.includes(filePath)) {
      return
    }

    createPagesFromFilePaths([filePath])
    filePaths.push(filePath)
  }

  function handleRemovedPath(filePath) {
    const componentPath = path.join(paths.pageDir, filePath)

    store.getState().pages.forEach(page => {
      if (page.component === componentPath) {
        deletePage({
          path: createPath(filePath.toLowerCase()),
          component: componentPath,
        })
      }
    })

    filePaths = filePaths.filter(x => x !== filePath)
  }

  watchDirectory(paths.pageDir, glob, handleAddedPath, handleRemovedPath)
}

module.exports = { createPages }
