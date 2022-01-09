import './Category.css'

const Category = (props) =>
{
  
  const onChangeHandler = (event) =>
  {
    props.onYearChange(event.target.value);
  }

  return (
      <div className="expenses-filter">
        <div className="expenses-filter__control">
          <label className="expenses-filter__label">Category</label>
          <select className="expenses-filter__select" onChange={onChangeHandler}>
            <option value="FOOD">FOOD</option>
            <option value="ELECTRICITY">ELECTRICITY</option>
            <option value="RESTAURANT">RESTAURANT</option>
            <option value="VACATION">VACATION</option>
            <option value="FURNITURES">FURNITURES</option>
            <option value="HARDWARE">HARDWARE</option>

          </select>
        </div>
      </div>
  );

}

export default Category