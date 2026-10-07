import SEO from "../../components/SEO";
import AccountForm from "../../components/AccountForm";

export default function Signup() {
  return (
    <>
      <SEO title="Create an account | Aetheria AI" noIndex />
      <AccountForm mode="signup" />
    </>
  );
}
