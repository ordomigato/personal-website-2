const path = require('path')

// @ts-ignore
exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions

    const postTemplate = path.resolve('src/templates/project.tsx')

    return graphql(`
      query Posts {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                api
                code
                path
                tech
                title
                website
                featuredImage {
                  childImageSharp {
                    gatsbyImageData(
                      layout: CONSTRAINED
                      height: 600
                      width: 1000
                      quality: 100
                    )
                  }
                }
              }
              html
              id
            }
          }
        }
      }
    `).then((res: any) => {
        if(res.errors) {
            return Promise.reject(res.errors)
        }

        // @ts-ignore
        res.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: postTemplate,
                context: {
                  data: node,
                }
            })
        })
    })
}