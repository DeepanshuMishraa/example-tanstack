import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

const Appbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <Link to="/" className="text-2xl font-bold">ExerciseRight</Link>
      </div>

      <div className="space-x-4">
        <ModeToggle />
        <Link to="/" className="px-4 py-2 text-sm font-semibold rounded-md">Get started</Link>
        <Button onClick={() => {
          window.location.href = "https://github.com/DeepanshuMishraa"
        }}>Github</Button>
      </div>
    </div>
  )
}

export default Appbar
