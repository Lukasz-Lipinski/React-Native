import { Navigation } from './components/Navigation';
import { FormContextProvider } from './ctx';

export default function App() {
  return (
    <FormContextProvider>
      <Navigation />
    </FormContextProvider>
  );
}
