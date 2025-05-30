import { cookies } from "next/headers";

export default async function TestPage() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    return (
      <div className="p-4">
        <h1>Server Component Test</h1>
        <p>This page can access cookies: {allCookies.length} cookies found</p>
        <pre>{JSON.stringify(allCookies, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <h1>Error</h1>
        <p>Error accessing cookies: {String(error)}</p>
      </div>
    );
  }
}
