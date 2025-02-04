import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handler, PageProps } from "$fresh/server.ts";
const kv = await Deno.openKv();

export const handler: Handler<{ serverValue: number }> = async (req, ctx) => {
  const serverValue = (await kv.get(["count"])).value
  return ctx.render({serverValue})
}


export default function Home(props: PageProps<{ serverValue: number }>) {
  const count = useSignal(props.data.serverValue);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-4">
          Lemons eaten this year: <strong>{props.data.serverValue}</strong>
        </p>
        <Counter count={count} />
      </div>
      
      <script type="module">
        import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate/dist/pwa-update.js';
        const el = document.createElement('pwa-update'); document.body.appendChild(el);
      </script>
    </div>
  );
}
