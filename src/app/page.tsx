// component
import Board from "@/components/features/Board";
import { BoardList } from "@/components/features/HomepageBoardList";

export default function Home() {
  return (
    <main className="container mx-auto p-5">
      <BoardList />
    </main>
  );
}
