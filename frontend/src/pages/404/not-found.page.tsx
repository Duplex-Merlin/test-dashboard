export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen flex flex-col justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center">
          <img src="/assets/images/404.jpg" alt="Merlin-3D error" />
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <a
            href="/"
            className="inline-flex text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
