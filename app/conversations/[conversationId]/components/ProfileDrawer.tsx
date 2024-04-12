import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationUsers } from "@/types";
import { Conversation } from "@prisma/client";
import { Fragment, useState } from "react";
import { format } from "date-fns";
import useActive from "@/hooks/useActive";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import ConversationAvatar from "@/components/ConversationAvatar";
import ConfirmModal from "./ConfirmModal";

interface Props {
  isOpen: boolean;
  conversation: Conversation & {
    conversationUsers: FullConversationUsers[];
  };
  onClose: () => void;
}

const ProfileDrawer: React.FC<Props> = ({ isOpen, conversation, onClose }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const joinedDate = format(new Date(otherUser.createAt), "yyyy.MM.dd");
  const { isActive, statusText } = useActive(conversation);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-black bg-opacity-40 " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={onClose}
                            >
                              <span className="sr-only">close panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 px-4 mt-6 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <ConversationAvatar conversation={conversation} />
                          </div>
                          <div>{conversation.name || otherUser.name}</div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => setConfirmOpen(true)}
                              className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-75"
                            >
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100">
                                <IoTrash size={20} />
                              </div>
                              <div className="text-sm font-light text-neutral-600">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="w-full pt-5 pb-5 sm:px-0 sm:pt-0">
                            <dl className="px-4 space-y-8 sm:space-y-6 sm:px-6">
                              {conversation.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Emails
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    {conversation.conversationUsers
                                      .flatMap((cUsers) => cUsers.user)
                                      .map((user) => user.email)
                                      .join(", ")}
                                  </dd>
                                </div>
                              )}
                              {!conversation.isGroup && (
                                <>
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Email
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      {otherUser.email}
                                    </dd>
                                  </div>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
