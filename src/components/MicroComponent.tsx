import { useQueryState } from "@keldan-systems/state-mutex"

export default function MicroComponent() {
  const [queryColor] = useQueryState<string>("text-color", "RED")

  let displayClass = ""

  switch (queryColor) {
    case "BLUE":
      displayClass = "microBlue"
      break
    case "GREEN":
      displayClass = "microGreen"
      break
    case "RED":
      displayClass = "microRed"
      break
    default:
      displayClass = "microGrey"
  }

  return (<div className={displayClass}>&nbsp;</div>)
}
