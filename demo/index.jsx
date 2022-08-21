import * as React from "react";

const App = () => {
  const [courseId, setCourseId] = React.useState(233323);
  const [courseName, setCourseName] = React.useState("课程名称");
  
  React.useEffect(() => {
    // @hubble:pv
    // @param itemId courseId
    // @param itemName courseName
    console.log(2333);
  }, []);

  const handleClick = () => {
    // @hubble:click
    // @param itemId courseId
    console.log(2233224234)
  }
  
  return (
    <div onClick={handleClick}>测试内容</div>
  )
}

export default React.memo(App);
