// import React from 'react'
// import { Form, Button, TimePicker,Input,Row,Col, } from 'antd'

// import '../css/ModalForm.css'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

// const { RangePicker } = TimePicker

// function TimeList({ workTime }) {
//   const rangeConfig = {
//     rules: [{ type: 'array' }],
//   }

//   const formItemLayout = {
//     labelCol: { span: 6 },
//     wrapperCol: { span: 16 },
//   }

//   const formItemLayoutWithOutLabel = {
//     wrapperCol: {
//       xs: { span: 16, offset: 0 },
//       sm: { span: 16, offset: 6 },
//     },
//   }

//   return (
//       <Form.List name="users">
//         {(fields, { add }) => {
//           return (
//             <div>
//               {fields.map((field) => (
//                 <Row key={field.key}>
//                   <Col>
//                     <Form.Item placeholder="age" name={[field.age, 'age']}>
//                       <Input />
//                     </Form.Item>
//                   </Col>
//                   <Col>
//                     <Form.Item placeholder="sex" name={[field.sex, 'sex']}>
//                       <Input />
//                     </Form.Item>
//                   </Col>
//                   <Col>
//                     <Form.Item placeholder="name" name={[field.name, 'name']}>
//                       <Input />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//               ))}
//               <button onClick={() => add()}>Add</button>
//             </div>
//           )
//         }}
//       </Form.List>
//   )
// }

// export default TimeList
