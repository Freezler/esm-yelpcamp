export default (func: any) => {
    return (req: any, res: any, next: any) => {
        func(req, res, next).catch(next);
    }
}