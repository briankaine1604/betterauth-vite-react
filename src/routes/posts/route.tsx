import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  component: PostsLayout,
})

function PostsLayout() {
  return (
    <div>
      <h2>📚 Posts Layout</h2>
      <Outlet />
    </div>
  )
}
