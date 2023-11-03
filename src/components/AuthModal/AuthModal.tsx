import { type FC, useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-light-svg-icons";

// Components
import Modal from "@/components/common/Modal";
import { Wallet, WalletHelper } from "./Wallet";
import { Login, LoginHelper } from "./Login";
import { Registration, RegistrationHelper } from "./Registration";

interface AuthModalProps {
  showModal: boolean;
  toggle: () => void;
}

type AuthModalState = "WALLET" | "LOGIN" | "REGISTRATION";

const AuthModal: FC<AuthModalProps> = ({
  showModal,
  toggle,
}) => {
  const [authModalState, setAuthModalState] = useState<AuthModalState>("REGISTRATION");

  const goToLogin = useCallback(() => {
    setAuthModalState("LOGIN");
  }, []);

  const goToRegister = useCallback(() => {
    setAuthModalState("REGISTRATION");
  }, []);

  const goBack = useCallback(() => {
    setAuthModalState("WALLET");
  }, []);

  useEffect(() => {
    if (!showModal) {
      setAuthModalState("WALLET");
    }
  }, [showModal]);

  return (
    <Modal
      open={showModal}
      onClose={toggle}
      className="!bg-transparent py-0"
      closeOnBackdropClick
    >
      {authModalState === "WALLET" && <Wallet />}
      {authModalState === "LOGIN" && <Login />}
      {authModalState === "REGISTRATION" && <Registration />}
      <div className="mt-10 text-center">
        {authModalState === "WALLET" && (
          <WalletHelper goToLogin={goToLogin} />
        )}
        {authModalState === "LOGIN" && (
          <LoginHelper goToRegister={goToRegister} />
        )}
        {authModalState === "REGISTRATION" && (
          <RegistrationHelper goBack={goBack} />
        )}
        <button className="mt-9" onClick={toggle}>
          <FontAwesomeIcon className="text-6xl" icon={faCircleXmark} />
        </button>
      </div>
    </Modal>
  );
}

export default AuthModal;
