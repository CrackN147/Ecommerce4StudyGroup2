export function Filters(props){
  const {sort, limit, changeLimit, changeSort} = props;
  return (
    <div className="filters">
      <button type="button" onClick={changeSort}>
        Sort: {sort}
      </button>
      <button type="button" onClick={changeLimit}>
        Limit: {limit}
      </button>
    </div>
  )
}