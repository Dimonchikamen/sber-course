/**
 * @param server { core.Express }
 * @param controller {{
 *          [key: string]: {
 *              path: string,
 *              method: string,
 *              handler: (
 *                  req:Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
 *                  res: Response<ResBody, LocalsObj>
 *              ) => Response<ResBody, LocalsObj>
 *           }
 *        }}
 */
module.exports = function (server, controller) {
    Object.keys(controller).forEach(key => {
        const { method, path, handler } = controller[key];
        server[method](path, handler);
    });
};
