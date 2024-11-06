/* eslint-disable react/prop-types */
export default function Heading({label}) {
  return (
    <div>
        <h3 className="text-3xl font-bold dark:text-white pt-2">{label}</h3>
    </div>
  )
}
