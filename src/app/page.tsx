// component
import Board from "@/components/features/Board";
import { BoardList } from "@/components/features/HomepageBoardList";

export default function Home() {
  return (
    <main className="flex flex-row flex-1 p-5 w-full h-full">
      <BoardList />
    </main>
  );
}
