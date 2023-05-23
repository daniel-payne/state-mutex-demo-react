import { HTMLAttributes, PropsWithChildren, useCallback, useState } from "react"

import { useDataState, useSharedState } from "@keldan-systems/state-mutex"
import { useQueryState } from "@keldan-systems/state-mutex"
import { useHashState } from "@keldan-systems/state-mutex"
import { useLocalState } from "@keldan-systems/state-mutex"

type ComponentProps = {
  title?: string
  index?: number
} & HTMLAttributes<HTMLDivElement>

export default function DemoComponent({ index }: PropsWithChildren<ComponentProps>) {
  const [one, setOne] = useState(1)

  const [sharedNumber, setSharedNumber] = useSharedState<number>("SHARED-VALUE-1", 100)
  const [sharedString, setSharedString] = useSharedState<string>("SHARED-VALUE-2", "x")

  const [queryColor, setQueryColor] = useQueryState<string>("text-color", "RED")
  const [hashNumber, setHashNumber] = useHashState<number>("test-number", 1)

  const [localNumber, setLocalNumber] = useLocalState<number>("LOCAL-VALUE-3", 300)
  const [localString, setLocalString] = useLocalState<string>("LOCAL-VALUE-5", "XXX")

  const dataNumber = useDataState<number>("SHARED-VALUE-1")

  const [count, setCount] = useQueryState<number>("demo-count", 0)

  const redButtonClassName = queryColor === "RED" ? "btn btn-danger" : "btn btn-outline-danger"
  const greenButtonClassName = queryColor === "GREEN" ? "btn mx-2 btn-success" : "btn mx-2 btn-outline-success"
  const blueButtonClassName = queryColor === "BLUE" ? "btn btn-info" : "btn btn-outline-info"

  const oneButtonClassName = hashNumber === 1 ? "btn btn-danger" : "btn btn-outline-danger"
  const twoButtonClassName = hashNumber === 2 ? "btn mx-2 btn-success" : "btn mx-2 btn-outline-success"
  const threeButtonClassName = hashNumber === 3 ? "btn btn-info" : "btn btn-outline-info"

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
      {/* useState ======================================================================================================================================= */}
      <div className="m-4 p-4 border border-secondary">
        <h6>useState</h6>
        {one}
        <button className="btn btn-sm" onClick={() => setOne(one + 1)}>
          Increase
        </button>
        <button className="btn btn-sm" onClick={() => setOne(one - 1)}>
          Decrease
        </button>
      </div>
      {/* useSharedState =================================================================================================================================== */}
      <div className="m-4 p-4 border border-secondary">
        <h6>useSharedState</h6>
        <div>
          <span>{sharedNumber}</span>
          <button className="btn btn-sm" onClick={() => setSharedNumber((sharedNumber ?? 0) + 1)}>
            Increase
          </button>
          <button className="btn btn-sm" onClick={() => setSharedNumber((sharedNumber ?? 0) - 1)}>
            Decrease
          </button>
        </div>
        <div>
          <span>{sharedString}</span>
          <button className="btn btn-sm" onClick={() => setSharedString((sharedString ?? "") + "x")}>
            Increase
          </button>
          <button className="btn btn-sm" onClick={() => setSharedString((sharedString ?? "").substring(0, (sharedString ?? "").length - 1))}>
            Decrease
          </button>
        </div>
      </div>
      {/* useQueryState =================================================================================================================================== */}
      <div className="m-4 p-4 border border-secondary">
        <h6>useQueryState</h6>
        <div>
          <span className="pe-2">{queryColor}</span>
          <button className={redButtonClassName} onClick={() => setQueryColor("RED")}>
            R
          </button>
          <button className={greenButtonClassName} onClick={() => setQueryColor("GREEN")}>
            G
          </button>
          <button className={blueButtonClassName} onClick={() => setQueryColor("BLUE")}>
            B
          </button>
        </div>
      </div>
      {/* useQueryState =================================================================================================================================== */}
      <div className="m-4 p-4 border border-secondary">
        <h6>useHashState</h6>
        <div>
          <span className="pe-2">{hashNumber}</span>
          <button className={oneButtonClassName} onClick={() => setHashNumber(1)}>
            1
          </button>
          <button className={twoButtonClassName} onClick={() => setHashNumber(2)}>
            2
          </button>
          <button className={threeButtonClassName} onClick={() => setHashNumber(3)}>
            3
          </button>
        </div>
      </div>
      {/* useLocalState =================================================================================================================================== */}
      <div className="m-4 p-4 border border-secondary">
        <h6>useLocalState</h6>
        <div>
          <span>{localNumber}</span>
          <button className="btn btn-sm" onClick={() => setLocalNumber((localNumber ?? 0) + 1)}>
            Increase
          </button>
          <button className="btn btn-sm" onClick={() => setLocalNumber((localNumber ?? 0) - 1)}>
            Decrease
          </button>
        </div>
        <div>
          <span>{localString}</span>
          <button className="btn btn-sm" onClick={() => setLocalString((localString ?? "") + "X")}>
            Increase
          </button>
          <button className="btn btn-sm" onClick={() => setLocalString((localString ?? "").substring(0, (localString ?? "").length - 1))}>
            Decrease
          </button>
        </div>
      </div>
      {/* useDataState =================================================================================================================================== */}
      <div className="m-4 px-4">
        <h6>useDataState</h6>
        <div>
          <span>{dataNumber}</span>
        </div>
      </div> 
    </div>
  )
}
