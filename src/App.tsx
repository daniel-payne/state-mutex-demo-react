import { useCallback, useState } from "react"

import { useStore, useQueryState, clearStore } from "@keldan-systems/state-mutex"

import DemoComponent from "./components/DemoComponent"

import "./App.css"
import SharedComponent from "./components/SharedComponent"
import StressComponent from "./components/StressComponent"

function App() {
  const [store] = useStore()
  const [demos, setDemos] = useQueryState<number>("demo-count", 0)
  const [shared, setShared] = useQueryState<number>("shared-count", 0)
  const [stress, setStress] = useQueryState<number>("stress-count", 0)

  const [showStore, setShowStore] = useState(false)

  const handleAddTest = useCallback(() => {
    setDemos(demos + 1)
  }, [demos, setDemos])

  const handleAddShared = useCallback(() => {
    setShared(shared + 1)
  }, [shared, setShared])

  const handleAddStress = useCallback(() => {
    if (stress === 0) {
      setStress(1)
    } else {
      setStress(stress * 2)
    }
  }, [stress, setStress])

  const handleClear = useCallback(() => {
    clearStore()
  }, [])

  const handleToggleShowStore = useCallback(() => {
    const newShow = !showStore
    setShowStore(newShow)
  }, [showStore])

  return (
    <div>
      <button className="btn btn-primary mx-2 mt-2" onClick={handleAddTest}>
        Add Demo
      </button>
      <button className="btn btn-primary mx-2 mt-2" onClick={handleAddShared}>
        Add Shared Test
      </button>
      <button className="btn btn-primary mx-2 mt-2" onClick={handleAddStress}>
        Add Stress Test
      </button>
      <button className="btn btn-danger mx-2 mt-2" onClick={handleClear}>
        Clear
      </button>
      <button className="btn btn-success btn-sm mx-2 mt-2" onClick={handleToggleShowStore}>
        {showStore ? "Hide" : "Show"} Store Details
      </button>
      <div className="d-flex flex-row justify-content-center align-items-center h-100 w-100 overflow-hidden flex-wrap">
        {demos > 0 && [...Array(demos)].map((_, index) => <DemoComponent index={index} key={index} />)}
        {shared > 0 && [...Array(shared)].map((_, index) => <SharedComponent index={index} key={index} />)}
        {stress > 0 && <StressComponent />}

        {showStore === true && (
          <div className="m-4 p-4 border border-success">
            <h6 className="text-secondary">useStore</h6>
            <pre>{JSON.stringify(store, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
