'use client';
import React from 'react';
import {
  AppLayout,
  Container,
  ContentLayout,
  Header,
  Button
} from '@cloudscape-design/components';
import Card from './components/Card.jsx';


export default function App() {
  return (
      <AppLayout
        toolsHide={true}
        navigationHide={true}
        content={
          <ContentLayout>
            <Card />

          </ContentLayout>
        }
      />
  );
}
