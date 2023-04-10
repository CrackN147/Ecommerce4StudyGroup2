export function TestJSX(props) {
  const { 
    name, 
    className
  } = props;
  return (
    <button className={className}>
      {name}
    </button>
  )
}