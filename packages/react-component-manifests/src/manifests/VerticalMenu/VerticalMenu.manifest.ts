import reactSchemaId from "@atrilabs/react-component-manifest-schema?id";
import {
  AcceptsChildFunction,
  flexColSort,
  ReactComponentManifestSchema,
} from "@atrilabs/react-component-manifest-schema";
import iconSchemaId from "@atrilabs/component-icon-manifest-schema?id";
import CSSTreeId from "@atrilabs/app-design-forest/src/cssTree?id";
import CustomTreeId from "@atrilabs/app-design-forest/src/customPropsTree?id";
import { CSSTreeOptions } from "@atrilabs/app-design-forest";
import { CustomPropsTreeOptions } from "@atrilabs/app-design-forest";

const acceptsChild: AcceptsChildFunction = (info: any) => {
  if (info.childCoordinates.length === 0) {
    return 0;
  }
  return flexColSort(info.loc, info.childCoordinates) || 0;
};

const cssTreeOptions: CSSTreeOptions = {
  boxShadowOptions: true,
  flexContainerOptions: true,
  flexChildOptions: true,
  positionOptions: true,
  typographyOptions: true,
  spacingOptions: true,
  sizeOptions: true,
  borderOptions: true,
  outlineOptions: true,
  backgroundOptions: true,
  miscellaneousOptions: true,
};

const customTreeOptions: CustomPropsTreeOptions = {
  dataTypes: {
    menuItems: {
      type: "array_map",
      singleObjectName: "item",
      attributes: [
        {
          fieldName: "name",
          type: "text",
        },
      ],
    },
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "VerticalMenu", category: "Basics" },
  dev: {
    decorators: [],
    attachProps: {
      styles: {
        treeId: CSSTreeId,
        initialValue: { display: "inline-block", position: "relative" },
        treeOptions: cssTreeOptions,
        canvasOptions: { groupByBreakpoint: true },
      },
      custom: {
        treeId: CustomTreeId,
        initialValue: {
          title: "Navigation",
          menuItems: [
            {
              name: "Submenu One",
            },
            {
              name: "Submenu Two",
            },
            {
              name: "Submenu Three",
              subMenuItems: [
                {
                  subMenuItemsName: "submenu three item #1",
                },
                {
                  subMenuItemsName: "submenu three item #2",
                },
                {
                  subMenuItemsName: "submenu three item #3",
                },
              ],
            },
          ],
        },
        treeOptions: customTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
    },
    attachCallbacks: {
      onClick: [{ type: "controlled", selector: ["custom", "open"] }],
    },
    defaultCallbackHandlers: {},
    acceptsChild,
  },
};

const iconManifest = {
  panel: { comp: "CommonIcon", props: { name: "VerticalMenu" } },
  drag: {
    comp: "CommonIcon",
    props: {
      name: "VerticalMenu",
      containerStyle: { padding: "1rem" },
    },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: compManifest,
    [iconSchemaId]: iconManifest,
  },
};
