import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    // Prepare the payload
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    };

    try {
      // Call the backend API
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle the response
      if (response.ok) {
        // Signup successful
        setTimeout(() => {
            setLoading(false);
            notification.success({
              message: 'Signup Successful',
              description: 'You have been successfully signed up!',
            });
          }, 1000);
      } else {
        // Signup failed
        setTimeout(() => {
            setLoading(false);
            notification.error({
              message: 'Signup Failed',
              description: 'Something went wrong, please retry!',
            });
          }, 1000);
      }
    } catch (error) {
        setTimeout(() => {
            setLoading(false);
            notification.error({
              message: 'Signup Failed',
              description: 'Something went wrong, please retry!',
            });
          }, 1000);
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ width: 400, margin: '50px auto 0', border: '1px solid #ddd', borderRadius: 15, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(to bottom right, #f7f7f7, #e9e9e9)' }}>
      <h3 style={{ textAlign: 'center', padding: '20px 0', background: '#1890ff', color: '#fff', margin: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>Sign up</h3>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{ padding: '20px' }}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;
