import React, { Children, cloneElement } from "react";
import {
  Animated,
  ActivityIndicator,
  FlatList,
  ScrollView,
  View
} from "react-native";
import { generateStyles } from "./styles";
import Text from "../Text";
import PropTypes from "prop-types";

export default class Table extends React.Component {
  /** generic props renderer */
  renderer = (object = {}, keyVal = "") => {
    let component = this.props[keyVal];
    let key = JSON.stringify(object);
    return typeof component === "function"
      ? component({ key, object })
      : Children.map(component, child => cloneElement(child, { key, object }));
  };
  constructor(props) {
    super(props);
    this.headerScrollView = null;
    this.footerScrollView = null;
    this.scrollPosition = new Animated.Value(0);
    this.scrollEvent = Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.scrollPosition } } }],
      { useNativeDriver: false }
    );
    this.state = { loading: false };
    let { cellWidth, cellHeight, borderWidth } = props;
    /** used to generate style for usage */
    this.styles = generateStyles(cellWidth, cellHeight, borderWidth);
  }
  /**
   * will handle data load when reached to the end of the list
   */
  handleScrollEndReached = () => {
    /** //TODO: need to be implemented */
    if (this.state.loading) {
      this.setState({ loading: false }, () =>
        setTimeout(this.props.scrollLoad.bind(this), 500)
      );
    }
  };

  componentDidMount() {
    let { fixedRowHeader } = this.props;
    if (fixedRowHeader) {
      this.listener = this.scrollPosition.addListener(position => {
        this.headerScrollView.scrollTo({ x: position.value, animated: false });
        /** will only work with footer is enabled  */
        if (this.props.fixedRowFooter) {
          this.footerScrollView.scrollTo({
            x: position.value,
            animated: false
          });
        }
      });
    }
  }

  componentWillUnmount() {
    let { fixedRowHeader } = this.props;
    if (fixedRowHeader) {
      this.scrollPosition.removeListener(this.listener);
    }
  }

  headerCell = (value = "", index = 0) => {
    return (
      <View
        key={value + index}
        style={[
          this.styles.cellStyle,
          this.styles.headerCellStyle,
          this.props.headerCellStyle
        ]}
      >
        {this.props.headerCell ? (
          this.renderer(
            {
              value,
              index,
              ...this.props.headerCellTextProps
            },
            "footerCell"
          )
        ) : (
          <Text {...this.props.headerCellTextProps}>
          {this.props.translate(value)}
        </Text>
        )}
      </View>
    );
  };
  footerCell = (value = "", index = 0) => {
    return (
      <View
        key={value + index}
        style={[
          this.styles.cellStyle,
          this.styles.footerCellStyle,
          this.props.footerCellStyle
        ]}
      >
        {this.props.footerCell ? (
          this.renderer(
            {
              value,
              index,
              ...this.props.footerCellTextProps
            },
            "footerCell"
          )
        ) : (
          <Text {...this.props.footerCellTextProps}>
            {this.props.translate(value)}
          </Text>
        )}
      </View>
    );
  };

  footerIntersectionCell = (value = "", index = 0) => {
    return (
      <View
        key={value + index}
        style={[
          this.styles.cellStyle,
          this.styles.footerCellStyle,
          this.props.footerCellStyle,
          this.props.footerIntersectionCellStyle
        ]}
      >
        {this.props.footerIntersectionCell ? (
          this.renderer(
            {
              value,
              index,
              ...this.props.footerCellTextProps
            },
            "footerIntersectionCell"
          )
        ) : (
          <Text {...this.props.footerCellTextProps}>
            {this.props.translate(value)}
          </Text>
        )}
      </View>
    );
  };
  headerIntersectionCell = (value = "", index = 0) => {
    return (
      <View
        key={value + index}
        style={[
          this.styles.cellStyle,
          this.styles.headerCellStyle,
          this.props.headerCellStyle,
          this.props.headerIntersectionCellStyle
        ]}
      >
        {this.props.headerIntersectionCell ? (
          this.renderer(
            {
              value,
              index,
              ...this.props.headerCellTextProps
            },
            "headerIntersectionCell"
          )
        ) : (
          <Text {...this.props.headerCellTextProps}>
            {this.props.translate(value)}
          </Text>
        )}
      </View>
    );
  };
  columnCell = (value = "", index = 0) => {
    return (
      <View
        key={value + index + JSON.stringify(this.props.data[index])}
        style={[
          this.styles.cellStyle,
          this.styles.columnCellStyle,
          this.props.columnCellStyle
        ]}
      >
        {this.props.renderFixedCell ? (
          this.renderer(
            {
              value,
              index,
              rowData: this.props.data[index],
              ...this.props.columnCellText
            },
            "renderFixedCell"
          )
        ) : (
          <Text {...this.props.columnCellText}>{value}</Text>
        )}
      </View>
    );
  };
  cell = ({ keyVal, item = "", index }, row, i) => {
    let Tag = Text;
    if (typeof item === "function") {
      item = item(this.props.data[i]);
      Tag = View;
    }
    return (
      <View
        key={item + index}
        style={[this.styles.cellStyle, this.props.cellStyle]}
      >
        {this.props[keyVal] ? (
          this.renderer(
            {
              item,
              index,
              ...this.props.CellText
            },
            keyVal
          )
        ) : (
          <Tag {...this.props.cellText}>{item}</Tag>
        )}
      </View>
    );
  };
  /**
   * used to get title of the left top cell
   */
  getTitle = () => {
    let { data, fixedRowHeaderData, fixedColumnHeaderTitle } = this.props;
    let title = "";
    if (fixedRowHeaderData && fixedRowHeaderData[fixedColumnHeaderTitle]) {
      title = fixedRowHeaderData[fixedColumnHeaderTitle];
    } else if (data.length > 0 && data[0][fixedColumnHeaderTitle]) {
      title = fixedColumnHeaderTitle;
    }
    /** to make proper translate from outside */
    return title;
  };
  renderFixedRowFooter = () => {
    //fixedRowHeaderData: [{ key: "title", value: "Başlık" }],
    let footerCells = this.getKeys(true);
    let { fixedColumnFooterTitle, fixedRowFooter } = this.props;
    let title = this.getTitle();
    /** if false render nothing */
    if (!fixedRowFooter) {
      return null;
    }
    return (
      <View
        style={[
          this.styles.FixedRowFooterStyle,
          this.props.FixedRowFooterStyle
        ]}
      >
        {!!fixedColumnFooterTitle && this.footerIntersectionCell(title)}
        <ScrollView
          ref={ref => (this.footerScrollView = ref)}
          horizontal={true}
          scrollEnabled={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {footerCells.map(this.footerCell)}
        </ScrollView>
      </View>
    );
  };
  /**
   * renders header part of the table
   */
  renderFixedRowHeader = () => {
    //fixedRowHeaderData: [{ key: "title", value: "Başlık" }],
    let headerCells = this.getKeys(true);
    let { fixedColumnHeaderTitle, fixedRowHeader } = this.props;
    let title = this.getTitle();
    /** if false render nothing */
    if (!fixedRowHeader) {
      return null;
    }
    return (
      <View
        style={[
          this.styles.FixedRowHeaderStyle,
          this.props.FixedRowHeaderStyle
        ]}
      >
        {/* used to render if fixed is set */}
        {!!fixedColumnHeaderTitle && this.headerIntersectionCell(title)}
        <ScrollView
          ref={ref => (this.headerScrollView = ref)}
          horizontal={true}
          scrollEnabled={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {headerCells.map((value, index) => this.headerCell(value, index))}
        </ScrollView>
      </View>
    );
  };
  renderFixedColumnHeader = () => {
    //fixedRowHeaderData: [{ key: "title", value: "Başlık" }],
    let cells = this.props.data.map(
      item => item[this.props.fixedColumnHeaderTitle]
    );
    return (
      <View
        style={[
          this.styles.FixedColumnHeaderStyle,
          this.props.FixedColumnHeaderStyle
        ]}
      >
        {cells.map((value, index) =>
          this.columnCell(this.props.translateFixedColumnHeader(value), index)
        )}
      </View>
    );
  };
  renderFixedColumnHeaderRev = () => {
    let cells = this.getKeys();
    return (
      <View
        style={[
          this.styles.FixedColumnHeaderStyle,
          this.props.FixedColumnHeaderStyle
        ]}
      >
        {cells.map((value, index) =>
          this.columnCell(this.props.translateFixedColumnHeader(value), index)
        )}
      </View>
    );
  };
  formatColumn = ({ item, index }) => {
    let key = JSON.stringify(item);
    return (
      <View key={"item" + key + index} style={this.styles.column}>
        {item.columnData.map((value, i, array) =>
          this.cell(
            { keyVal: item.key, item: value, index: i + index + key },
            array,
            i
          )
        )}
      </View>
    );
  };
  getKeys = (forHeader = false) => {
    let headerCells = [];
    let { data, fixedRowHeaderData } = this.props;

    if (data.length) {
      /** gets data when data array is provided to the component  */
      Object.keys(data[0]).forEach(key => {
        if (key !== this.props.fixedColumnHeaderTitle) {
          headerCells.push(
            forHeader &&
              fixedRowHeaderData &&
              fixedRowHeaderData[key] &&
              fixedRowHeaderData[key] !== undefined
              ? fixedRowHeaderData[key]
              : key
          );
        }
      });
    } else {
      /** used to get header values from fixedRowHeaderData if data is not provided at the beginning */
      Object.entries(fixedRowHeaderData).map(([key, value]) => {
        if (key !== this.props.fixedColumnHeaderTitle) {
          headerCells.push(forHeader ? value : key);
        }
      });
    }
    return headerCells;
  };
  renderRow = () => {
    let data = [];
    this.getKeys().map(key => {
      if (key !== this.props.fixedColumnHeaderTitle) {
        let columnData = this.props.data.map(item => item[key]);
        data.push({
          key,
          columnData
        });
      }
    });
    return (
      <View>
        {!!this.props.fixedColumnHeaderTitle && this.renderFixedColumnHeader()}
        <FlatList
          style={[
            this.styles.body,
            this.props.fixedColumnHeaderTitle ? {} : { marginLeft: 0 },
            this.props.bodyStyle
          ]}
          horizontal={true}
          data={data}
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          renderItem={this.formatColumn}
          stickyHeaderIndices={[0]}
          onScroll={this.scrollEvent}
          scrollEventThrottle={16}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  renderRowRev = () => {
    let data = [];
    this.props.data.map(item => {
      let columnData = this.getKeys().map(key => item[key]);
      data.push({
        key: "notsupported",
        columnData
      });
    });
    return (
      <View>
        {!!this.props.fixedColumnHeaderTitle &&
          this.renderFixedColumnHeaderRev()}
        <FlatList
          style={[
            this.styles.body,
            this.props.fixedColumnHeaderTitle ? {} : { marginLeft: 0 }
          ]}
          horizontal={true}
          data={data}
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          renderItem={this.formatColumn}
          stickyHeaderIndices={[0]}
          onScroll={this.scrollEvent}
          scrollEventThrottle={16}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={[this.styles.container, this.props.style]}>
        {this.renderFixedRowHeader()}
        <FlatList
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          data={[12]}
          renderItem={this.props.reverse ? this.renderRowRev : this.renderRow}
          onEndReached={this.handleScrollEndReached}
          onEndReachedThreshold={0.005}
          ListFooterComponent={this.renderFixedRowFooter}
        />
        {this.state.loading && <ActivityIndicator />}
      </View>
    );
  }
}

Table.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  bodyStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  borderWidth: PropTypes.number,
  FixedRowHeaderStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  FixedColumnHeaderStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  cellStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  cellText: PropTypes.object,
  columnCellText: PropTypes.object,
  headerCellTextProps: PropTypes.object,
  columnCellStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array.isRequired,
  fixedRowHeaderData: PropTypes.object,
  fixedColumnHeaderTitle: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  // cell: PropTypes.element,
  scrollLoad: PropTypes.func,
  reverse: PropTypes.bool,
  translateFixedColumnHeader: PropTypes.func,
  translate: PropTypes.func,
  renderFixedCell: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
    PropTypes.bool
  ]),
  /** Header intersection */
  headerIntersectionCellStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  headerIntersectionCell: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
    PropTypes.bool
  ]),
  /** Header cells */
  headerCellStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  headerCell: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
    PropTypes.bool
  ]),

  fixedRowFooter: PropTypes.bool,
  FixedRowFooterStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fixedColumnFooterTitle: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  footerCellStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Footer intersection */
  footerIntersectionCellStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  footerIntersectionCell: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
    PropTypes.bool
  ]),
  /** footer cells */
  footerCellTextProps: PropTypes.object,
  footerCell: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
    PropTypes.bool
  ])
};

Table.defaultProps = {
  style: {},
  bodyStyle: {},
  cellWidth: undefined,
  cellHeight: undefined,
  borderWidth: undefined,
  FixedRowHeaderStyle: {},
  FixedColumnHeaderStyle: {},
  /** Header intersection */
  headerIntersectionCellStyle: {},
  headerIntersectionCell: false,
  /** Header cells */
  headerCellStyle:{},
  headerCell: false,
  cellStyle: {},
  cellText: {},
  columnCellStyle: {},
  columnCellText: {},
  headerCellTextProps: {},
  data: [
    {
      title: "hello",
      desc: "Olamaloa",
      postType: "Vlog",
      a: "sdfsef sdfsdfsdf",
      b: "sdfsef sdfsdfsdf"
    },
    {
      title: "hello 2",
      desc: "Olamaloa 2",
      postType: "Vlog 2",
      a: "sdfsef sdfsdfsdf",
      b: "sdfsef sdfsdfsdf"
    },
    {
      title: "hello",
      desc: "Olamaloa",
      postType: "Vlog",
      a: "sdfsef sdfsdfsdf",
      b: "sdfsef sdfsdfsdf"
    }
  ],
  fixedRowHeader: false,
  fixedRowHeaderData: {
    title: "Başlık",
    desc: "Açıklama",
    postType: "Tip",
    a: " aaaa",
    b: "bbbbb"
  },
  translateFixedColumnHeader: key => key,
  translate: key => key,
  fixedColumnHeaderTitle: false,
  cell: PropTypes.element,
  scrollLoad: () => {},
  reverse: true,
  renderFixedCell: false,
  fixedRowFooter: false,
  FixedRowFooterStyle: {},
  footerCellStyle: {},
  /** render footer */
  fixedColumnFooterTitle: false,
  /** footer intersection */
  footerIntersectionCellStyle: {},
  footerIntersectionCell: false,
  /** footer cells */
  footerCellTextProps: {},
  footerCell: false,
};
