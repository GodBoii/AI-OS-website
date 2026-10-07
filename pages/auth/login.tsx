import SEO from "../../components/SEO";
import AccountForm from "../../components/AccountForm";

export default function Login() {
  return (
    <>
      <SEO title="Log in | Aetheria AI" noIndex />
      <AccountForm mode="login" />
    </>
  );
}
