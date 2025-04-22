import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { socialIntegration } from "@/data/socialIntegration";

export default function IntegrationContent() {
    return (
        <>
            <h2 className="text-2xl mb-4 font-bold">Connect Your Social Media Accounts</h2>

            <div className="grid md:grid-cols-2 gap-2">
                {socialIntegration.map((integration, index) => (
                    <Card key={index} className="">
                        <CardHeader>
                            <CardTitle className={`text-green-800 text-xl`}>{integration.platform}</CardTitle>
                            <CardDescription className={`italic`}>
                                Connect your {integration.platform} account to enable these permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm list-disc px-5">
                                {integration.permissions.map((permission, idx) => (
                                    <li key={idx} title={permission.Description}>
                                        {permission.permissionsDetails}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            {/* <Button className={`cursor-pointer bg-red-800 hover:bg-red-700`}>Disconnect</Button> */}
                            <Button disabled={true} className={`cursor-pointer hover:bg-green-700`}>Connect</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}