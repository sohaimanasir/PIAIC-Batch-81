import './globals.css'

export const metadata = {
  title: 'Task Manager App',
  description: 'A simple, efficient task manager to organize your tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}