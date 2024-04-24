export default function BlogsLayout({ children }) {
  return (
    <main>
      <div className="sticky top-0">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
