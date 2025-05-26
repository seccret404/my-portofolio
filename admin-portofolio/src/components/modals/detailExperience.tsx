import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { Experience } from '../../api/types';

interface DetailExperienceModalProps {
    isOpen: boolean;
    onClose: () => void;
    experience: Experience;
}

export default function DetailExperienceModal({ 
    isOpen, 
    onClose, 
    experience 
}: DetailExperienceModalProps) {
    const parseStack = (stackString: string): string[] => {
        return stackString.split(',').map(tech => tech.trim());
    };

const techStack = parseStack(
  Array.isArray(experience.stack) ? experience.stack.join(', ') : experience.stack
);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-bold leading-6 text-[#1F3A5F] mb-4"
                                >
                                    {experience.role}
                                </Dialog.Title>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-[#3D5A80]">Company</h4>
                                        <p className="text-gray-700">{experience.company}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-[#3D5A80]">Period</h4>
                                        <p className="text-gray-700">{experience.periode}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-[#3D5A80]">Contributions</h4>
                                        <p className="text-gray-700 whitespace-pre-line">{experience.contribution}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-[#3D5A80]">Technologies</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {techStack.map((tech, index) => (
                                                <span 
                                                    key={index} 
                                                    className="px-3 py-1 bg-[#e0e0e0] text-gray-700 rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-[#3D5A80] text-white rounded-md hover:bg-[#4d648d] transition-colors"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}