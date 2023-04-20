import { requireUserId } from "../utils/auth.server";

export const loader = async ({ request }) => {
    await requireUserId(request)
    return null
  }
  
export default function Admin() {
    return (
        <main>
            <h2>here is the administrative page where eventually you'll be able to create new posts</h2>
        </main>
    );
}