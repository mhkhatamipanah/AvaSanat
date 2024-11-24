import UseWindowSize from "@/src/hooks/UseWindowSize/UseWindowSize";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function TabComponent({ specifications, description, descriptionSpecifications }) {
    const { width } = UseWindowSize()

    return (
        <div className="flex w-full flex-col ">
            <Tabs size={width > 768 ? "md" : "sm"} className="vazirMedium asdasdsadsdafs" aria-label="Options">
                {((specifications && specifications.length !== 0) || descriptionSpecifications) && <Tab key="photos" title="مشخصات">
                    <Card>
                        <CardBody className="vazirMedium rtl text-right p-3">
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse rounded-md">
                                    <tbody className="rounded-md">
                                        {specifications && specifications.map((spec, index) => (

                                            <tr
                                                key={index}
                                                className={`${index % 2 === 0 ? 'bg-gray-100' : ' bg-white'}`}
                                            >
                                                <td className=" px-4 py-3 text-right max-[768px]:w-[30vw] w-[250px] md:text-md text-sm vazirDemibold ">
                                                    {spec.title}
                                                </td>
                                                <td className=" px-4 py-3 pr-7 text-right text-[12px] sm:text-base text-gray-600 vazirLight border-r-2 ">
                                                    {spec.value}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <div className={`${(specifications && specifications.length !== 0)? "mt-1" :   ""} `}>
                                    {descriptionSpecifications.split("\n").map((line, index) => (
                                        <p
                                            key={index}
                                            className="text-gray-800 text-sm sm:text-base !leading-[26px] py-0.5 px-3">
                                            {line}
                                        </p>
                                    ))}
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Tab>}
                {description && <Tab key="description" title="توضیحات تکمیلی">
                    <Card>
                        <CardBody className="vazirMedium rtl text-right">
                            {description.split("\n").map((line, index) => (
                                <p
                                    key={index}
                                    className="text-gray-800 text-sm sm:text-base !leading-[26px] py-0.5 px-3">
                                    {line}
                                </p>
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
                }

            </Tabs>
        </div>
    );
}