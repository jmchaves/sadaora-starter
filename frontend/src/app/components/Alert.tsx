import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Alert({ msg = "" }) {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{msg}</p>
        </div>
      </div>
    </div>
  )
}
