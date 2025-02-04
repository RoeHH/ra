import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {

  props.count.subscribe((value) => {
    fetch("http://localhost:8000/api/counter", {method: "POST", body: JSON.stringify({count: value})}).then((res) => res.text()).then((text) => {
      console.log(text);
    });
  });

  
    

  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => props.count.value -= 1}>-1</Button>
      <p class="text-3xl tabular-nums">{props.count}</p>
      <Button onClick={() => props.count.value += 1}>+1</Button>
    </div>
  );
}
