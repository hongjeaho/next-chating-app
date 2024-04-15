"use client";
import Button from "@/components/form/Button";
import Modal from "@/components/modals/Modal";
import useConversation from "@/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setLoading] = useState(false);

  const handlerDelete = () => {
    setLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle
            className="w-6 h-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            대화 삭제
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              이 대화를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          disabled={isLoading}
          danger
          onClick={handlerDelete}
          label="삭제"
        />
        <Button disabled={isLoading} secondary onClick={onClose} label="취소" />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
