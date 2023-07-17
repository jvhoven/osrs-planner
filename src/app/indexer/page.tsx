"use client"

import { useRef, useEffect, useState } from "react"
import { Message } from "./types";
import styled from "styled-components";
import { Loader } from "@/components/loader";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

const IndexerPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  margin-top: 5rem;
  min-height: 40svh;
  width: 50%;

  h2 {
      margin-bottom: 1rem;
    }

  p {
      flex: 0.2;
    }

  .category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;

    span {
      margin: 0 1rem;
    }
  }

  .action {
    display: flex;
    justify-content: center;
    flex: 1;

    ${Button} {
      align-self: flex-end;
    }
  }
`

export default function Page() {
  const router = useRouter()
  const [progress, setProgress] = useState<Record<string, { message: string, status: Message["status"] }>>({});
  const workerRef = useRef<Worker>()

  useEffect(() => {
    workerRef.current = new Worker(new URL('./web-worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<Message>) => setProgress({
      ...progress,
      [`${event.data.category}`]: {
        message: event.data.message,
        status: event.data.status
      }
    })

    workerRef.current?.postMessage("begin-index");

    return () => {
      workerRef.current?.terminate()
    }
  }, []);

  function allTasksDone() {
    return Object.entries(progress).every(([, { status }]) => status === "success");
  }

  return (
    <IndexerPageContainer>
      <h2>Indexer</h2>
      <p>Before you begin to plan our your journey, we need to fetch up-to-date data. Please wait until the below steps are done.</p>
      {Object.entries(progress).map(([category, data]) => (
        <div className="category" key={category}>
          <b>{category}</b>
          <span>{data.message}</span>
          <span>{data.status === "success" ? "✅" : data.status === "failed" ? "❎" : <Loader />}</span>
        </div>
      ))}
      <div className="action">
        <Button onClick={() => router.push('/characters')} disabled={!allTasksDone()}><span>{allTasksDone() ? "Continue" : "Waiting for tasks to complete"}</span></Button>
      </div>
    </IndexerPageContainer >
  )
}
