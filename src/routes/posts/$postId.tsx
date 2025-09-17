import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  // In a loader
  // loader: ({ params }) => fetchPost(params.postId),
  // Or in a component
  component: PostComponent,
})

function PostComponent() {
  // In a component!
  const { postId } = Route.useParams()
  return <div>Post ID: {postId}</div>
}