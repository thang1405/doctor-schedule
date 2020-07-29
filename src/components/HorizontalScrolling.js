import React, { useState } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import '../css/HorizontalScrolling.css'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'

// list of items
const list = [
  { name: 'item1' },
  { name: 'item2' },
  { name: 'item3' },
  { name: 'item4' },
  { name: 'item5' },
  { name: 'item6' },
  { name: 'item7' },
  { name: 'item8' },
  { name: 'item9' },
  { name: 'item10' },
]

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
  return <div className="menu-item">{text}</div>
}

// All items component
// Important! add unique key
export const Menu = (list) =>
  list.map((el) => {
    const { name } = el
    return <MenuItem text={name} key={name} />
  })


const ArrowLeft = (
  <div className="arrow">
    <LeftCircleFilled style={{ fontSize: '32px' ,color:''}}/>
  </div>
)
const ArrowRight = (
  <div className="arrow">
    <RightCircleFilled />
  </div>
)

const HorizontalScrolling = (props) => {
  const [selected, setSelected] = useState(0)
  const menu = Menu(list, selected)

  return (
    <div className="App">
      <h4>Bác sĩ đề cử</h4>
      <ScrollMenu
        data={menu}
        alignCenter={false}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={selected}
        wheel={false}
        onSelect={(key) => setSelected(key)}
      />
    </div>
  )
}

export default HorizontalScrolling
