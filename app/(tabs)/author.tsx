import { Redirect } from 'expo-router';

export default function AuthorTab() {
  return <Redirect href="/info-detail?page=builder" />;
}
