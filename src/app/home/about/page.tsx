/**
 * @name AboutPage
 * @description
 * @author darcrand
 */

export default function AboutPage() {
  return (
    <>
      <article className='prose prose-stone w-md max-w-full mx-auto my-4'>
        <h1>orzpass</h1>

        <blockquote>a simple password manager</blockquote>

        <h2>Technology stack</h2>
        <ol>
          <li>nextjs</li>
          <li>react-query</li>
          <li>react-hook-form</li>
          <li>tailwindcss</li>
        </ol>

        <h2>How to deploy for yourself</h2>
        <ul>
          <li>create your github repository as a database</li>
          <li>generate a github token</li>
          <li>
            clone the repository
            <pre>
              <code>git clone https://github.com/Darcrandex/orzpass</code>
            </pre>
          </li>
          <li>
            set your env variables in <code>.env</code> file
            <pre>
              <code>NEXT_APP_BASE_API_URL =</code>
              <br />
              <code>NEXT_APP_GITHUB_TOKEN =</code>
              <br />
              <code>NEXT_APP_JWT_SECRET =</code>
              <br />
              <code>NEXT_ENCODE_TIMES =</code>
            </pre>
          </li>
          <li>
            run the app
            <pre>
              <code>pnpm dev</code>
            </pre>
          </li>
        </ul>
      </article>
    </>
  )
}
