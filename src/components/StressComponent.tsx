import { useQueryState } from "@keldan-systems/state-mutex"
import { useCallback } from "react"
import MicroComponent from "./MicroComponent"

export default function StressComponent() {
  const [stress, setStress] = useQueryState<number>("stress-count", 0)

  const [queryColor, setQueryColor] = useQueryState<string>("text-color", "RED")

  const handleAddStress = useCallback(() => {
    if (stress === 0) {
      setStress(1)
    } else {
      setStress(stress * 2)
    }
  }, [stress, setStress])

  const redButtonClassName = queryColor === "RED" ? "btn btn-danger" : "btn btn-outline-danger"
  const greenButtonClassName = queryColor === "GREEN" ? "btn mx-2 btn-success" : "btn mx-2 btn-outline-success"
  const blueButtonClassName = queryColor === "BLUE" ? "btn btn-info" : "btn btn-outline-info"

  return (
    <div className="m-4 p-4 border border-success" data-component="TestComponent">
      <div className="d-flex flex-row justify-content-between">
        <div>
          <h3>{stress}</h3>
        </div>
        <div>
        <button className="btn btn-warning btn-sm" onClick={handleAddStress}>
            Double
          </button>
          <button className="btn btn-danger btn-sm ms-2" onClick={()=> {setStress(0)}}>
            Remove
          </button>
        </div> 
      </div>
      <div className="m-4 p-4 border border-secondary">
        <h6>useQueryState</h6>
        <div>
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
      <div className="m-4 p-4 border border-secondary">
        <div className="d-flex flex-row flex-wrap justify-content-begin">
          {stress > 0 && [...Array(stress)].map((_, index) => <MicroComponent key={index} />)}
        </div>
      </div>
    </div>
  )
}
