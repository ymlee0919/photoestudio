
export interface ServiceInfo {
    serviceId: number;
    service: string;
    image: string;
    remoteUrl: string;
}

export interface CreatedService extends ServiceInfo {
    createdAt: Date;
}

export interface UpdatedServiceInfo extends ServiceInfo {
    updatedAt: Date;
}

export interface UpdatedService extends ServiceInfo {
    updatedAt: Date;
    old: ServiceInfo;
}
