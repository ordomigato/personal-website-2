// declare namespace GraphQL {
//   namespace Model {
//     interface Post {
//       html: string;
//       frontmatter: {
//         date: string;
//         path: string;
//         title: string;
//       };
//       allMarkdownRemark: {
//         edges: Array<{
//           node: Model.Post[]
//         }>
//       }
//     }
//   }

//   namespace Query {
//     interface Posts {
//       allMarkdownRemark: {
//         edges: Array<{
//           node: Model.Post[]
//         }>
//         fields: {
//           sort: string;
//         }
//       };
//     }
//   }
// }