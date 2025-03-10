export default class RTPIS {

    public getLines = async (Code: number, Page: number = 1, PageSize: number = 999, OrderBy: any = "Code", Order: any = 1) => {
        try {
            const capAPI = useCapApi()
            const { data } = await (await capAPI.useAPI())({
                method: 'get',
                url: '/V1/RTPIS/GetLines',
                params: {
                    Code,
                    Page,
                    PageSize,
                    OrderBy,
                    Order
                },
                data: {}
            })
            return { result: true, msg: 'Success', data }
        } catch (e) {
            return { result: false, msg: 'ERROR' }
        }
    }

    public getStation = async (Code: number, Page: number = 1, PageSize: number = 999, lineCode: any = null, OrderBy: any = 'Order', Order: any = 1) => {
        try {
            const capAPI = useCapApi()
            const { data } = await (await capAPI.useAPI())({
                method: 'get',
                url: `/V1/RTPIS/GetStationLines`,
                params: { Code, Page, PageSize, OrderBy, Order, lineCode },
                data: {}
            })
            return { result: true, msg: 'Success', data }
        } catch (e) {
            return { result: false, msg: 'ERROR' }
        }
    }

    public getBus = async (code: number, stationCode: any) => {
        try {
            const capAPI = useCapApi()
            const { data } = await (await capAPI.useAPI())({
                method: 'get',
                url: `/V1/RTPIS/GetBusInLine`,
                params: { code, stationCode },
                data: {}
            })
            return { result: true, msg: 'Success', data }
        } catch (e) {
            return { result: false, msg: 'ERROR' }
        }
    }

    public getSummary = async (code: number) => {
        try {
            const capAPI = useCapApi()
            const { data } = await (await capAPI.useAPI())({
                method: 'get',
                url: `/V1/RTPIS/SummaryEvent`,
                params: { code },
                data: {}
            })
            return { result: true, msg: 'Success', data }
        } catch (e) {
            return { result: false, msg: 'ERROR' }
        }
    }

}
