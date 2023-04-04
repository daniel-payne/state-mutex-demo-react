import { HTMLAttributes, PropsWithChildren, useCallback } from "react"

import { useSharedState } from "@keldan-systems/state-mutex"
import { useQueryState } from "@keldan-systems/state-mutex"

import type { RecordStorage } from "@keldan-systems/state-mutex"

const initialRecord = {
  task: null,
  name: "dan",
  age: 21,
  male: true,
  jobs: ["one", "two"],
  boss: {
    name: "kellie",
  },
}

type ComponentProps = {
  title?: string
  index?: number
} & HTMLAttributes<HTMLDivElement>

export default function SharedComponent({ index }: PropsWithChildren<ComponentProps>) {
  const [sharedNumber, setSharedNumber] = useSharedState<number>("SHARED-NUMBER", 100)
  const [sharedString, setSharedString] = useSharedState<string>("SHARED-STRING", "x")
  const [sharedBoolean, setSharedBoolean] = useSharedState<boolean>("SHARED-BOOLEAN", true)
  const [sharedArray, setSharedArray] = useSharedState<Array<number>>("SHARED-ARRAY", [1, 2, 3])
  const [sharedRecord, setSharedRecord] = useSharedState<RecordStorage>("SHARED-RECOARD", initialRecord)

  const [count, setCount] = useQueryState<number>("shared-count", 0)

  const handleRemove = useCallback(() => {
    if (count > 0) {
      setCount(count - 1)
    }
  }, [count, setCount])

  return (
    <div className="m-4 p-4 border border-success" data-component="TestComponent">
      <div className="d-flex flex-row justify-content-between">
        <div>
          <h3>{index}</h3>
        </div>
        <div>
          <button className="btn btn-danger btn-sm" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>

      {/* useSharedState =================================================================================================================================== */}
      <div className="">
        <div className="m-4 p-4 border  border-secondary">
          <h6 className="text-secondary">useSharedState&lt;number&gt;</h6>
          <div className="mx-0 my-1">{sharedNumber}</div>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSharedNumber((sharedNumber ?? 0) + 1)}>
            Increase
          </button>
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => setSharedNumber((sharedNumber ?? 0) - 1)}>
            Decrease
          </button>
        </div>

        <div className="m-4 p-4 border  border-secondary">
          <h6 className="text-secondary">useSharedState&lt;string&gt;</h6>
          <div className="mx-0 my-1">{sharedString}</div>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSharedString((sharedString ?? "") + "x")}>
            Increase
          </button>
          <button
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => setSharedString((sharedString ?? "").substring(0, (sharedString ?? "").length - 1))}
          >
            Decrease
          </button>
        </div>

        <div className="m-4 p-4 border  border-secondary">
          <h6 className="text-secondary">useSharedState&lt;boolean&gt;</h6>
          <div className="mx-0 my-1">{sharedBoolean ? "TRUE" : "false"}</div>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSharedBoolean(!sharedBoolean)}>
            flip
          </button>
        </div>

        <div className="m-4 p-4 border  border-secondary">
          <h6 className="text-secondary">useSharedState&lt; Array&lt;string|number|boolean&gt; &gt;</h6>
          <div className="mx-0 my-1">{JSON.stringify(sharedArray)}</div>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSharedArray([...(sharedArray ?? []), 0])}>
            Push
          </button>
          <button
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => setSharedArray(sharedArray ? [...sharedArray.slice(0, sharedArray.length - 1)] : [])}
          >
            Pop
          </button>
        </div>

        <div className="m-4 p-4 border  border-secondary">
          <h6 className="text-secondary">useSharedState&lt; Record&lt;string, string|number|boolean&gt; &gt;</h6>
          <div className="mx-0 my-1">{JSON.stringify(sharedRecord)}</div>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setSharedRecord({ ...sharedRecord, task: "one" })}>
            Add
          </button>
          <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => setSharedRecord({ ...sharedRecord, task: null })}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
